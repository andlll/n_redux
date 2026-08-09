/// gml_Object_tutorial_thumb_Mouse_4
// locals: __b__
action_set_relative(1);
if (instance_number(pauser) > 0) {
    sprite_index = 518;
} else {
    sprite_index = 1358;
}
with (tutorial_square) {
    __b__ = action_if_variable(phase, 4, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    instance_create(casa3.x, casa3.y, sold13);
}
with (tutorial_square) {
    __b__ = action_if_variable(phase, 33, 1);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (tutorial_square) {
        phase = phase + 0.5;
    }
} else {
    action_set_relative(0);
    action_create_object(disba, 0, 0);
    action_set_relative(1);
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
}
action_set_relative(0);
