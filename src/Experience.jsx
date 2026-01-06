import { OrbitControls, useGLTF, useTexture, Center, Sparkles, shaderMaterial } from "@react-three/drei"
import { Perf } from "r3f-perf"
import * as THREE from "three"
import vertexShader from "./shaders/portal/vertex.glsl"
import fragmentShader from "./shaders/portal/fragment.glsl"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
// const PortalMaterial = shaderMaterial(
//     {
//         uTime: 0,
//         uColorStart: new THREE.Color("ffffff"),
//         uColorEnd: new THREE.Color("000000"),
//     },
//     vertexShader,
//     fragmentShader
// )
// console.log(PortalMaterial)
// extend({ PortalMaterial })

const Experience = () => {
    const texture = useTexture("./Baked.png")
    //texture.flipY = false
    const { nodes } = useGLTF("./Portal3.glb")
    const portalLight = useRef()
    useFrame((state, delta) => {
       //portalLight.current.uniforms.uTime.value += delta\
       portalLight.current.uniforms.uTime.value += delta
    })
    return (
        <>
            {/* <Perf position="top-left" /> */}
            <OrbitControls />
            {/* <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh> */}
            <Center>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={texture} map-flipY={false} />
                </mesh>
                <mesh geometry={nodes.PoleLightA.geometry}
                    position={nodes.PoleLightA.position}
                >
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>
                <mesh geometry={nodes.PoleLightB.geometry}
                    position={nodes.PoleLightB.position}
                >
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>
                <mesh geometry={nodes.PortalLight.geometry}
                    position={nodes.PortalLight.position}
                    rotation={nodes.PortalLight.rotation}
                >
                    {/* <portalMaterial ref={portalLight} /> */}
                    <shaderMaterial ref={portalLight}
                 vertexShader={vertexShader} 
                 fragmentShader={fragmentShader}
                 uniforms={{
                    uTime: {value: 0},
                    uColorStart: {value: new THREE.Color("#ffffff")},
                    uColorEnd: {value: new THREE.Color("#000000")}
                 }} 
                 />
                </mesh>
                <Sparkles
                    size={4}
                    count={20}
                    position-y={1.5}
                    scale={[6, 2, 4]}
                    speed={0.6}
                    color="#ffffe5"
                />
            </Center>
        </>
    )
}

export default Experience
