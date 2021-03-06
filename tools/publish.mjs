#!/usr/bin/env node
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import semver from 'semver';

const packagesPath = './dist/packages';

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'ui-viewer')
    .map((dirent) => dirent.name)
    .reverse();

const libraries = getDirectories(packagesPath);

const publishLibrary = (lib) =>
  execSync(`cd ${packagesPath}/${lib}/ && npm publish`);

console.log(`Publishing ${libraries} to npm`);

libraries.forEach((lib) => {
  console.log(`Publishing ${lib}`);
  publishLibrary(lib);
});

console.log(`Published all libraries ${libraries}`);
