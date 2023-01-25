import * as THREE from "three"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export function Ground() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, 0, 0]} />
    </RigidBody>
  )
}
