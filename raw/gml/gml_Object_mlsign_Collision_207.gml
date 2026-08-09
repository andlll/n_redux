/// gml_Object_mlsign_Collision_207
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(arm, 1, 0);
if (__b__) {
    with (r12) {
        mon = mon + -200;
    }
    with (other.id) {
        anmo = anmo + 1;
    }
    action_set_relative(0);
    arm = 0;
    action_set_relative(1);
}
with (other.id) {
    __b__ = action_if_variable(anmo, 0, 0);
}
if (__b__) {
    action_sprite_set(r0, 0, 1);
    action_set_relative(0);
    full = 0;
    action_set_relative(1);
}
with (other.id) {
    __b__ = action_if_variable(anmo, 1, 0);
}
if (__b__) {
    action_sprite_set(rocico, 0, 1);
    action_set_relative(0);
    full = 0;
    action_set_relative(1);
}
with (other.id) {
    __b__ = action_if_variable(anmo, 2, 0);
}
if (__b__) {
    action_sprite_set(r2, 0, 1);
    action_set_relative(0);
    full = 0;
    action_set_relative(1);
}
with (other.id) {
    __b__ = action_if_variable(anmo, 3, 0);
}
if (__b__) {
    action_sprite_set(r3, 3, 1);
    action_set_relative(0);
    full = 0;
    action_set_relative(1);
}
with (other.id) {
    __b__ = action_if_variable(anmo, 4, 0);
}
if (__b__) {
    action_sprite_set(r4, 0, 1);
    action_set_relative(0);
    full = 1;
    action_set_relative(1);
}
action_set_relative(0);
