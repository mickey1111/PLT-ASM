const requiredENVVariables = [
    'NODE_ENV',
    'PORT'
];

export default function validateConfig(){
    requiredENVVariables.forEach(envName => {
        if(!process.env[envName]){
            throw new Error(`Environment variable ${envName} is missing`)
        }
    });
}

