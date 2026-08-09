/// gml_Object_clublite4_Alarm_2
// locals: __b__
action_set_relative(0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_set_alarm(34, 2);
}
with (r12) {
    action_set_relative(1);
    ele = ele + -22;
    action_set_relative(0);
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(16762965, 1);
    } else {
        action_sprite_color(8454143, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(16777215, 1);
    } else {
        action_sprite_color(6832895, 1);
    }
}
action_set_relative(0);
