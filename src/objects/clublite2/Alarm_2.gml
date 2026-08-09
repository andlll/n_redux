/// gml_Object_clublite2_Alarm_2
// locals: __b__
action_set_relative(0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_set_alarm(30, 2);
}
with (r12) {
    action_set_relative(1);
    ele = ele + -20;
    action_set_relative(0);
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(4259584, 1);
    } else {
        action_sprite_color(16744703, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(4227327, 1);
    } else {
        action_sprite_color(14200751, 1);
    }
}
action_set_relative(0);
