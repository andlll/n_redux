/// gml_Object_impa32f_Create_0
// locals: __b__
action_set_relative(1);
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
depth = -y - 271;
alarm[0] = 240;
phase = 1;
demos = 0;
action_create_object(impa32r, 0, 0);
action_set_relative(0);
