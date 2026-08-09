/// gml_Object_banca1_light_Create_0
// locals: __b__
depth = -y - 1;
trans = 0;
action_sprite_set(empty, 0, 1);
__b__ = action_if_number(159, 0, 2);
if (__b__) {
    __b__ = action_if_number(161, 0, 2);
    if (__b__) {
        instance_create(pu1.x, pu1.y, stella3);
    }
}
