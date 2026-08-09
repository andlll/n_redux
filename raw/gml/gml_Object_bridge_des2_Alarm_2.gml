/// gml_Object_bridge_des2_Alarm_2
// locals: __b__
action_sprite_set(empty2, 0, 0);
with (bridge_des2_sin) {
    action_sprite_set(bridr1_sin, 0, 1);
}
with (bridge_des2_des) {
    action_sprite_set(bridr1_des, 0, 1);
}
__b__ = action_if_dice(10);
if (__b__) {
    action_create_object(cargomaker, 4500, 2170);
}
