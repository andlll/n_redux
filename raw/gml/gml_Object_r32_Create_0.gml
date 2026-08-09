/// gml_Object_r32_Create_0
// locals: __b__
action_set_relative(0);
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
action_create_object(honda21, 472, 1959);
maghene = 0;
action_set_alarm(8750, 4);
action_set_relative(1);
action_create_object(r320, 1616, 0);
action_set_relative(0);
instance_create(x + 181, y + 416, object8);
instance_create(x + 429, y + 559, object8);
instance_create(x + 478, y + 531, object8);
instance_create(x + 530, y + 559, object8);
instance_create(x + 478, y + 596, object8);
instance_create(x + 778, y + 414, object8);
instance_create(x + 678, y + 703, object8);
instance_create(x + 728, y + 673, object8);
instance_create(x + 1223, y + 441, object8);
instance_create(x + 1371, y + 415, object8);
action_set_relative(0);
