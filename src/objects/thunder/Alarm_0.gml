/// gml_Object_thunder_Alarm_0
// locals: __b__
action_set_alarm(15, 1);
__b__ = action_if_variable(tha, 1, 0);
if (__b__) {
    action_sprite_set(th1s, 0, 1);
}
__b__ = action_if_variable(tha, 2, 0);
if (__b__) {
    action_sprite_set(th2s, 0, 1);
}
