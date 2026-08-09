/// gml_Object_birb_Alarm_1
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    action_sprite_set(brb2, 0, 1);
    action_set_alarm(24, 2);
}
action_set_alarm(60, 1);
