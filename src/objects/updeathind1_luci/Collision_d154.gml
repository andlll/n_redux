/// gml_Object_updeathind1_luci_Collision_317
// locals: __b__
__b__ = action_if_variable(arm, 1, 0);
if (__b__) {
    with (other.id) {
        action_kill_object();
    }
}
