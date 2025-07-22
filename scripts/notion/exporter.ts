import fs from 'fs/promises';
import path from 'path';
import { NotionExporter, ChainData, ExporterError } from 'notion-to-md/types';

/**
 * Configuration for the FileSystemExporter
 */
export interface GenericExporterConfig {
  // Output type: 'file', 'stdout', or 'buffer'
  outputType: 'file' | 'stdout' | 'buffer';

  // For 'file' type: path where files will be written, directories will be created if they don't exist
  outputFolder?: string;

  // For 'buffer' type: reference to store the content
  buffer?: Record<string, string>;

  // The property name in Notion that contains the URL for the page
  urlPropertyNameNotion: string;
}

/**
 * Generic exporter that handles saving content to the filesystem,
 * printing to stdout, or storing in a buffer
 */
export class GenericExporter implements NotionExporter {
  constructor(private config: GenericExporterConfig) {
    this.validateConfig();
  }

  private extractPageUrl(blockTree: ChainData['blockTree']): string {
    const propertyKey = this.config.urlPropertyNameNotion;
    const property = blockTree.properties[propertyKey];
    if (!property) {
      throw new Error(
        `Property "${propertyKey}" not found in blockTree properties`
      );
    }
    if (property.type === 'url') {
      if (
        !property.url ||
        typeof property.url !== 'string' ||
        property.url.trim().length === 0
      ) {
        throw new Error(`Property "${propertyKey}" is a URL but has no value`);
      }
      return property.url;
    }
    if (property.type === 'rich_text') {
      const url = property.rich_text.map(text => text.plain_text).join('');
      if (!url || url.trim().length === 0) {
        throw new Error(
          `Property "${propertyKey}" is rich_text but has no URL`
        );
      }
      return url;
    }
    if (property.type === 'formula') {
      if (property.formula.type !== 'string') {
        throw new Error(
          `Property "${propertyKey}" is a formula but not of type string`
        );
      }
      const url = property.formula.string;
      if (!url || url.trim().length === 0) {
        throw new Error(
          `Property "${propertyKey}" formula is empty or not a valid URL`
        );
      }
      return url;
    }
    throw new Error(
      `Property "${propertyKey}" is not a URL, rich_text, or formula type`
    );
  }

  /**
   * Export the conversion result according to configuration
   */
  public async export(data: ChainData): Promise<void> {
    console.log(data);
    try {
      const { blockTree, content } = data;
      const pagePath = new URL(this.extractPageUrl(blockTree)).pathname;

      switch (this.config.outputType) {
        case 'file':
          await this.exportToFile(pagePath, content);
          break;

        case 'stdout':
          this.exportToStdout(content);
          break;

        case 'buffer':
          this.exportToBuffer(pagePath, content);
          break;
      }
    } catch (error) {
      throw new ExporterError(
        `Export failed: ${error instanceof Error ? error.message : String(error)}`,
        data.pageId,
        'export',
        error
      );
    }
  }

  /**
   * Export content to a file
   */
  private async exportToFile(pageId: string, content: string): Promise<void> {
    if (!this.config.outputFolder) {
      throw new Error('outputFolder is required for file output type');
    }

    const directory = path.dirname(path.join(this.config.outputFolder, pageId));

    // Create all parent directories if they don't exist
    if (!(await fs.exists(directory))) {
      await fs.mkdir(directory, { recursive: true });
    }

    try {
      await fs.writeFile(
        path.join(this.config.outputFolder, `${pageId}.md`),
        content,
        'utf-8'
      );
    } catch (error) {
      throw new Error(
        `Failed to write file: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Export content to stdout
   */
  private exportToStdout(content: string): void {
    console.log(content);
  }

  /**
   * Export content to a buffer object
   */
  private exportToBuffer(pageId: string, content: string): void {
    if (!this.config.buffer) {
      throw new Error('buffer is required for buffer output type');
    }

    this.config.buffer[pageId] = content;
  }

  /**
   * Validate the provided configuration
   */
  private validateConfig(): void {
    if (!this.config.outputType) {
      throw new Error('outputType is required');
    }

    if (this.config.outputType === 'file' && !this.config.outputFolder) {
      throw new Error('outputFolder is required for file output type');
    }

    if (this.config.outputType === 'buffer' && !this.config.buffer) {
      throw new Error('buffer is required for buffer output type');
    }
  }
}
