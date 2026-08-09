/// gml_Object_laserone_retro_Collision_95
// locals: __b__
action_set_relative(0);
with (other.id) {
    __b__ = action_if_variable(desto, 1, 0);
}
if (__b__) {
    dat = 1;
    with (other.id) {
        action_set_relative(1);
        action_create_object(esplo, 0, 0);
        action_set_relative(0);
    }
    with (other.id) {
        action_kill_object();
    }
}
action_set_relative(0);
