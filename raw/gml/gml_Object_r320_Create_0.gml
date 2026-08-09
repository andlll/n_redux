/// gml_Object_r320_Create_0
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
instance_create(x + 453, y + 585, object8);
instance_create(x + 551, y + 585, object8);
instance_create(x + 802, y + 440, object8);
instance_create(x + 850, y + 413, object8);
instance_create(x + 1001, y + 556, object8);
instance_create(x + 1051, y + 528, object8);
instance_create(x + 1051, y + 583, object8);
instance_create(x + 1099, y + 556, object8);
