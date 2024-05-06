import Phaser from 'phaser';

export function LoadSpriteSheet (scene: Phaser.Scene, key: string, url: string, frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig): Promise<string>
{
    return new Promise((resolve, reject) => {

        const loader = scene.load as Phaser.Loader.LoaderPlugin;

        loader.spritesheet(key, url, frameConfig);

        loader.once(`filecomplete-spritesheet-${key}`, () => {

            resolve(key);

        });

        loader.on(Phaser.Loader.Events.FILE_LOAD_ERROR, (file: Phaser.Loader.File) => {

            console.error(`LoadSpriteSheet: ${file.key} failed to load.`);

            if (file.key === key)
            {
                reject(key);
            }

        });

        if (!loader.isLoading())
        {
            loader.start();
        }

    });
}