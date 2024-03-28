import { logger } from "../functions/logger.function";
import { CSSRules, ruleObject } from "../interfaces/rules.interface";

export class StyleMaster {
  public debug: boolean = false;
  public classRules: Array<ruleObject> = [];
  public idRules: Array<ruleObject> = [];
  public tagRules: Array<ruleObject> = [];

  constructor(debug: boolean) {
    this.debug = debug;
    // console.log("New Style Master Instantiated");
  }

  //red-f// class functions
  addClassRule(name: string, rules: CSSRules) {
    const classRegEx = /.[_a-zA-Z]+[a-zA-Z0-9_-]*/;
    if (!classRegEx.test(name)) {
      throw new Error("Invalid Class Name");
    }
    this.classRules.push({ name, rules });
  }

  updateClassRule(name: string, rules: CSSRules) {
    let isFound: boolean = false;
    this.classRules = this.classRules.map((c) => {
      if (c.name === name) {
        isFound = true;
        c.rules = rules;
      }
      return c;
    });
    if (!isFound) {
      throw new Error("Invalid Class Name");
    }
  }

  getClassRule(name: string) {
    let isFound: boolean = false;
    this.classRules.forEach((c) => {
      if (c.name === name) {
        isFound = true;
        return c.rules;
      }
    });
    throw new Error("Invalid Class Name");
  }

  removeClassRule(name: string) {
    this.classRules = this.classRules.filter((c) => c.name !== name);
  }

  //red-f// ID functions
  addIdRule(name: string, rules: CSSRules) {
    const idRegEx = /#[_a-zA-Z]+[a-zA-Z0-9_-]*/;
    if (!idRegEx.test(name)) {
      throw new Error("Invalid ID Name");
    }
    this.idRules.push({ name, rules });
  }

  updateIdRule(name: string, rules: CSSRules) {
    let isFound: boolean = false;
    this.idRules = this.idRules.map((c) => {
      if (c.name === name) {
        isFound = true;
        c.rules = rules;
      }
      return c;
    });
    if (!isFound) {
      throw new Error("Invalid ID Name");
    }
  }

  getIdRule(name: string) {
    this.idRules.forEach((c) => {
      if (c.name === name) {
        return c.rules;
      }
    });
    throw new Error("Invalid ID Name");
  }

  removeIdRule(name: string) {
    this.idRules = this.idRules.filter((c) => c.name !== name);
  }

  //red-f// Tag functions
  addTagRule(name: string, rules: CSSRules) {
    // const idRegEx = /#[_a-zA-Z]+[a-zA-Z0-9_-]*/;
    // if (!idRegEx.test(name)) {
    //   throw new Error("Invalid ID Name");
    // }
    this.tagRules.push({ name: name, rules: rules });
  }

  updateTagRule(name: string, rules: CSSRules) {
    let isFound: boolean = false;
    this.tagRules = this.tagRules.map((c) => {
      if (c.name === name) {
        isFound = true;
        c.rules = rules;
      }
      return c;
    });
    if (!isFound) {
      throw new Error("Invalid Tag Name");
    }
  }

  getTagRule(name: string) {
    this.tagRules.forEach((c) => {
      if (c.name === name) {
        return c.rules;
      }
    });
    throw new Error("Invalid Tag Name");
  }

  removeTagRule(name: string) {
    this.tagRules = this.tagRules.filter((c) => c.name !== name);
  }

  //red-f// Apply The Rules to ELements
  applyTags() {
    this.tagRules.forEach((rule) => {
      const elements: HTMLCollectionOf<Element> = document.getElementsByTagName(
        rule.name
      );
      for (let i = 0; i < elements.length; i++) {
        Object.keys(rule.rules).forEach((key) => {
          (elements[i] as HTMLElement).style.setProperty(key, rule.rules[key]);
        });
      }
    });
  }
  applyClasses() {
    this.classRules.forEach((rule) => {
      const elements: HTMLCollectionOf<Element> =
        document.getElementsByClassName(rule.name.slice(1));
      for (let i = 0; i < elements.length; i++) {
        Object.keys(rule.rules).forEach((key) => {
          (elements[i] as HTMLElement).style.setProperty(key, rule.rules[key]);
        });
      }
    });
  }
  applyIds() {
    this.idRules.forEach((rule) => {
      const elements: HTMLElement | null = document.getElementById(
        rule.name.slice(1)
      );
      if (!elements) {
        return;
      }
      Object.keys(rule.rules).forEach((key) => {
        (elements as HTMLElement).style.setProperty(key, rule.rules[key]);
      });
    });
  }
  applyAll(selector?: string) {
    if (selector && ["id", "class", "tag"].indexOf(selector) < 0) {
      throw new Error("Invalid input");
    }
    if ((!selector || selector === "tag") && this.tagRules.length > 0) {
      logger("tags", this.debug);
      this.applyTags();
    }
    if ((!selector || selector === "class") && this.classRules.length > 0) {
      logger("classes", this.debug);
      this.applyClasses();
    }
    if ((!selector || selector === "id") && this.idRules.length > 0) {
      logger("ids", this.debug);
      this.applyIds();
    }
  }
}

// export { StyleMaster };
