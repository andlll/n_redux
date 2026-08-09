/// gml_Object_di22_Step_0
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
        action_sprite_set(i22lls, 0, 1);
        action_set_alarm(59, 2);
        trans = 1;
        exit;
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
        action_sprite_set(i22ll, 59, -1);
        action_set_alarm(59, 3);
        trans = 0;
        exit;
    }
}
