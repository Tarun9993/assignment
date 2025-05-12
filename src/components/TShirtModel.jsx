// // /src/components/TShirtModel.jsx
// import React, { useRef } from 'react';
// import { useGLTF, useTexture } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';

// export function TShirtModel({ image }) {
//   const ref = useRef();
//   const { scene } = useGLTF('/models/shirt_backed.glb'); // make sure this file exists in public/models/
//   const texture = useTexture(image);

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.005;
//     }
//   });

//   if (texture) {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         child.material.map = texture;
//         child.material.needsUpdate = true;
//       }
//     });
//   }

//   return <primitive object={scene} ref={ref} scale={2} />;
// }

// // src/components/TShirtModel.jsx
// import React, { useRef, useEffect } from 'react';
// import { useGLTF, useTexture } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';

// export function TShirtModel({ image }) {
//   const ref = useRef();
//   const { scene } = useGLTF('/models/tshirt.glb'); // CORRECT way to load from public/
//   const texture = useTexture(image);

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.005; // auto-rotate the model
//     }
//   });

//   useEffect(() => {
//     if (texture) {
//       scene.traverse((child) => {
//         if (child.isMesh) {
//           child.material.map = texture;
//           child.material.needsUpdate = true;
//         }
//       });
//     }
//   }, [texture, scene]);

//   return <primitive object={scene} ref={ref} scale={2} />;
// }
import React, { useRef, useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function TShirtModel({ image }) {
  const ref = useRef();
 const { scene } = useGLTF('/models/shirt_baked.glb');

  const texture = useTexture(image || '/placeholder.png'); // fallback if image is not selected

  useEffect(() => {
    if (texture && scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture, scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={ref} scale={2} />;
}
