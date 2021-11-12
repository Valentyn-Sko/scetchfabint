// Sketchfab Viewer API: StartAR, "Total White Label", Load Model Progress info
const version = '1.8.0';
const uid = 'cc89c1e265514cbab1234eba999683e1';
const iframe = document.getElementById('api-frame');
const client = new window.Sketchfab(version, iframe);

let api;

var error = function() {
  console.error('Sketchfab API error');
};

var success = function(apiClient) {

  api = apiClient;

  api.start(function() {
    console.log('started');
  });

  api.addEventListener('viewerready', function() {
    console.log('viewer ready');
  });

  api.addEventListener('modelLoadProgress', function(eventData) {
    console.log("model-LoadProgress", Math.floor(eventData.progress * 100));
  });

  api.addEventListener('textureLoadProgress', function(eventData) {
    console.log("texture-LoadProgress", Math.floor(eventData.progress * 100));
  });

  document.getElementById('init').addEventListener('click', function() {
    api.startAR();
  });
};

//////////////////////////////////
// GUI Code
//////////////////////////////////
const initGui = () => {
  const controls = document.getElementById('controls');
  let buttonsText = '';
  buttonsText += '<button id="init">start AR</button>';
  controls.innerHTML = buttonsText;
};
initGui();

//////////////////////////////////
// GUI Code end
//////////////////////////////////

client.init(uid, {
  annotation: 0, // Usage: Setting to [1 – 100] will automatically load that annotation when the viewer starts.
  annotations_visible: 1, // Usage: Setting to 0 will hide annotations by default.
  autospin: 0, // Usage: Setting to any other number will cause the model to automatically spin around the z-axis after loading.
  autostart: 1, // Usage: Setting to 1 will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.
  cardboard: 0, // Usage: Start the viewer in stereoscopic VR Mode built for Google Cardboard and similar devices.
  camera: 0, // Usage: Setting to 0 will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.
  preload: 1, // Usage: Setting to 1 will force all resources (textures) to download before the scene is displayed.
  ui_stop: 0, // Usage: Setting to 0 will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.
  transparent: 0, // Usage: Setting to 1 will make the model's background transparent
  ui_animations: 0, // Usage: Setting to 0 will hide the animation menu and timeline.
  ui_annotations: 0, // Usage: Setting to 0 will hide the Annotation menu.
  ui_controls: 0, // Usage: Setting to 0 will hide all the viewer controls at the bottom of the viewer (Help, Settings, Inspector, VR, Fullscreen, Annotations, and Animations).
  ui_fullscreen: 0, // Usage: Setting to 0 will hide the Fullscreen button.
  ui_general_controls: 1, // Usage: Setting to 0 will hide main control buttons in the bottom right of the viewer (Help, Settings, Inspector, VR, Fullscreen).
  ui_help: 0, // Usage: Setting to 0 will hide the Help button.
  ui_hint:0, // Usage: Setting to 0 will always hide the viewer hint animation ("click & hold to rotate"). Setting to 1 will show the hint the first time per browser session (using a cookie). Setting to 2 will always show the hint.
  ui_infos: 0, // Usage: Setting to 0 will hide the model info bar at the top of the viewer.
  ui_inspector: 0, // Usage: Setting to 0 will hide the inspector button.
  ui_settings: 0, // Usage: Setting to 0 will hide the Settings button.
  ui_vr: 0, // Usage: Setting to 0 will hide the View in VR button.
  ui_watermark_link: 0, // Usage: Setting to 0 remove the link from the Sketchfab logo watermark.
  ui_color: '00ffc0', // Usage: Setting to a hexidecimal color code (without the #) or a HTML color name will change the color of the viewer loading bar.
  ui_watermark: 0, // Usage: Setting to 0 remove the Sketchfab logo watermark.
  ui_loading: 0, // Usage: remove all progress bars
  success: success,
  error: error
});
