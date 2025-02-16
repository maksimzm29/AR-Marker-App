document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");
    const modelContainer = document.getElementById("animatedModel");

    // Загрузка GLTF-модели
    const loader = new THREE.GLTFLoader();
    loader.load("model.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // Масштаб модели
        model.position.set(0, 0, 0); // Центрируем на маркере

        // Добавляем анимацию (если есть в модели)
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        modelContainer.object3D.add(model);

        // Запускаем обновление анимации
        scene.addEventListener("renderstart", () => {
            scene.renderer.setAnimationLoop(() => {
                mixer.update(0.01); // Обновление анимации
            });
        });
    });
});
