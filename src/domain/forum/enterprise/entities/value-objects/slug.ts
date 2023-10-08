export class Slug {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(slug: string) {
    return new Slug(slug);
  }

  /**
   * Receives a string and normalize it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Turn whitespaces into "-"
      .replace(/[^\w-]+/g, '') // Remove anything but words
      .replace(/_/g, '-') // Turns "_" into "-"
      .replace(/--+/g, '-') // Turns "--" into "-"
      .replace(/-$/g, ''); // Remove end of string "-"

    return new Slug(slugText);
  }
}
