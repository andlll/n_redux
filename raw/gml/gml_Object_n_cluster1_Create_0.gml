/// gml_Object_n_cluster1_Create_0
// locals: __b__
action_set_relative(1);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
action_move_to(0, -3000);
action_set_relative(0);
action_set_motion(210, 7);
action_set_relative(1);
action_set_relative(0);
action_set_alarm(1200, 0);
action_set_relative(1);
action_set_relative(0);
