/// gml_Object_grutop_Alarm_4
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    action_sprite_set(gto, 34, -1);
    action_set_alarm(35, 6);
} else {
    action_set_alarm(37, 4);
}
