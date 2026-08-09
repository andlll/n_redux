/// gml_Object_m3cant_Create_0
// locals: __b__
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
alarm[0] = 440;
depth = -y + 1;
phase = 1;
redder = 0;
instance_create(x + 2, y, impa31f);
instance_create(x, y - 100, playbuttoner);
