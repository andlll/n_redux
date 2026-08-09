/// gml_Object_i22cc_Step_0
// locals: __b__
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(trans, 0, 0);
    if (__b__) {
        action_sprite_set(i22c, 4, 1);
        trans = 1;
    }
}
with (aura) {
    __b__ = action_if_variable(night, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(trans, 1, 0);
    if (__b__) {
        action_sprite_set(empty, 0, 1);
        trans = 0;
    }
}
