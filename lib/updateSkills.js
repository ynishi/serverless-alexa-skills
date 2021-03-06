'use strict';

const BbPromise = require('bluebird');
const AlexaApi = require('./AlexaApi');
const getToken = require('./getToken');

module.exports = {
  updateSkills(diffs) {
    const alexaApi = new AlexaApi(getToken(this.tokenFilePath));
    return BbPromise.bind(this)
      .then(() => BbPromise.resolve(diffs))
      .map(function (diff) {
        if (diff.diff != null) {
          const localSkills = this.serverless.service.custom.alexa.skills;
          const local = localSkills.find(skill => skill.id === diff.skillId);
          return alexaApi.updateSkill(local.id, local.skillManifest);
        }
        return BbPromise.resolve();
      });
  },
};
