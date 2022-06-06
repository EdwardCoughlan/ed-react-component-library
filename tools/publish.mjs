#!/usr/bin/env node
import { execSync } from 'child_process';
import { readdirSync } from 'fs';

const distPackagesPath = './dist/packages';

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const libraries = getDirectories(distPackagesPath);

const getLibraryVersion = (lib) =>
  execSync(`cd ${distPackagesPath}/${lib}/ && npm view . version`)
    .toString()
    .trim();

const setLibraryVersion = (lib, version) =>
  execSync(`cd ${distPackagesPath}/${lib}/ && npm version ${version}`);

const patchLibraryVersion = (lib) =>
  execSync(`cd ${distPackagesPath}/${lib}/ && npm version patch`);

const publishLibrary = (lib) =>
  execSync(`cd ${distPackagesPath}/${lib}/ && npm publish`);

console.log(`Publishing ${libraries} to npm`);

libraries.forEach((lib) => {
  const version = getLibraryVersion(lib);
  console.log(`Setting ${lib} latest version ${version}`);
  setLibraryVersion(lib, version);
  console.log(`Patching ${lib}`);
  patchLibraryVersion(lib);
  console.log(`Publishing ${lib}`);
  publishLibrary(lib);
});
