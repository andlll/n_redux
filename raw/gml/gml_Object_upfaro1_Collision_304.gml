/// gml_Object_upfaro1_Collision_304
// locals: __b__
__b__ = action_if_variable(arm, 1, 0);
if (__b__) {
    with (other.id) {
        action_kill_object();
    }
}
