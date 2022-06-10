var audioLoader, audioListener;

function PlaySound()
{
    audioListener = new THREE.AudioListener();
    camera.add(audioListener);

    audioLoader = new THREE.AudioLoader();
    var audioClip = new THREE.Audio(audioListener);
    audioLoader.load('Assets/Sounds/NFS Carbon.mp3', function (buffer){
        audioClip.setBuffer(buffer);
        audioClip.setLoop(true);
        audioClip.play();
    });
}