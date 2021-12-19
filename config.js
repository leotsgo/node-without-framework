/* Configura e exporta as variaveis de configuração */

const environments = {};

environments.staging = {
  'port' : 3000,
  'envName' : 'staging',
};

environments.production = {
  'port' : 5000,
  'envName' : 'production',
};

// Determina o ambiente que estamos rodando e define o environment padrão caso um ambiente não seja definido
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' 
    ? environments[currentEnvironment] 
    : environments.staging;

module.exports = environmentToExport;
