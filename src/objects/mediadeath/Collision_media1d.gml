/// gml_Object_mediadeath_Collision_196
// locals: __b__
__b__ = action_if_variable(arm, 1, 0);
if (__b__) {
    with (other.id) {
        action_kill_object();
    }
    action_set_alarm(1, 0);
}
