/// gml_Object_nidark_slow_Alarm_0
// locals: __b__
action_set_alarm(60, 0);
__b__ = action_if_dice(6);
if (__b__) {
    action_sprite_set(n2d_raito, 0, 1);
    action_set_alarm(20, 1);
}
