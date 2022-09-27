import Amplify from "aws-amplify";

const awsConfiguration = () => {
    Amplify.configure({
        Auth: {
            userPoolId: 'us-east-1_0Nc0fPTGM',
            region: 'us-east-1',
            userPoolWebClientId: '2opgdboa3pjfbbdgdivsvs4r7m' 
          }
    })
};

export default awsConfiguration;
