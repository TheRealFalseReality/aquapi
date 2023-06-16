# ESPHome Project Template

This repo serves as a template for creating a new ESPHome project.

It includes a GitHub workflow that will automatically build the configuration(s) and then deploys a simple 
website via GitHub pages that utilises [ESP Web Tools](https://esphome.github.io/esp-web-tools/) for users to 
easily install your project onto their device.

## Instructions

1. Use this repo template to [generate](https://github.com/esphome/esphome-project-template/generate) your own repository.
   - Make sure to check `Include all branches` so that GitHub Pages is automatically enabled.
2. Clone your new repository.
3. Add your project specific YAML configuration(s) along with the contents of the `project-template-....yaml` files, taking note of the comments in this template file and name accordingly.
4. 
    a. Update [.github/workflows/publish.yml](.github/workflows/publish.yml) to contain your own YAML config filename(s).
    b. Update [.github/workflows/ci.yml](.github/workflows/ci.yml) to contain your own YAML config filename(s).
5. Update [static/_config.yml](static/_config.yml) to change the title, description and basic theme of the generated website.
6. Add more content to the [static/index.md](static/index.md) file to explain your project.
    Make sure to leave the installation code tags in place so users get the install button.
7. Push your changes to the repository and GitHub Actions will automatically build and deploy your project.
