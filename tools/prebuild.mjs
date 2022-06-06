#!/usr/bin/env node
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import semver from 'semver';

const packagesPath = './packages';

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'ui-viewer')
    .map((dirent) => dirent.name)
    .reverse();

const libraries = getDirectories(packagesPath);

const getLibraryVersion = (lib) =>
  Object.values(
    JSON.parse(
      execSync(
        `cd ${packagesPath}/${lib}/ && npm view . version --json`
      ).toString()
    )
  )[0];

const setLibraryVersion = (lib, version) =>
  execSync(`cd ${packagesPath}/${lib}/ && npm version ${version}`);

console.log(`Publishing ${libraries} to npm`);

libraries.forEach((lib) => {
  const version = getLibraryVersion(lib);
  console.log(`Setting ${lib} latest version ${semver.inc(version, 'patch')}`);
  setLibraryVersion(lib, semver.inc(version, 'patch'));
});

console.log(`Published all libraries ${libraries}`);
