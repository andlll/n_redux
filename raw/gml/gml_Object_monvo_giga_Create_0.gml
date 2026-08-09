/// gml_Object_monvo_giga_Create_0
// locals: __b__
action_set_relative(0);
life = 3;
action_set_alarm(34, 5);
action_set_alarm(3600, 6);
action_set_motion(30, random_range(5, 9));
depth = -3990;
desto = 1;
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_move_to(-200, 0);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_move_to(-370, 0);
        action_set_relative(0);
    }
}
action_set_relative(0);
