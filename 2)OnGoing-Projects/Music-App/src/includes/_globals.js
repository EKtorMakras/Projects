import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  install(app) {
    const baseComponents = import.meta.glob("../components/base/*.vue", {
      eager: true,
      import: "default",
    });

    Object.entries(baseComponents).forEach(([path, module]) => {
      // Extract folder and filename from path
      const pathParts = path.split("/");
      const fileName = pathParts.pop().replace(/\.\w+$/, ""); // Remove .vue extension
      const folderName = pathParts.pop(); // Get the folder name (base)

      // Create component name: FolderNameFileName (e.g., BaseButton)
      const componentName =
        upperFirst(camelCase(folderName)) + upperFirst(camelCase(fileName));

      app.component(componentName, module);
    });
  },
};
