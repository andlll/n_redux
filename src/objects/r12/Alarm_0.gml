/// gml_Object_r12_Alarm_0
// locals: __b__
action_set_alarm(140, 0);
__b__ = action_if_dice(12);
if (__b__) {
    action_create_object(birb, random_range(-3000, 3000), 2500);
}
__b__ = action_if_dice(36);
if (__b__) {
    action_create_object(birbcluster, random_range(-3000, 3000), 2500);
}
__b__ = action_if_number(161, 0, 2);
if (__b__) {
    __b__ = action_if_variable(storm, 1, 0);
    if (__b__) {
        action_create_object(nidark, 2000, -140);
        action_create_object(nidark, 2174, -120);
        action_create_object(nidark, 2374, -150);
        action_create_object(nidark, 2574, -110);
        action_create_object(nidark, 2774, -130);
        action_create_object(nidark, 2974, -110);
        action_create_object(nidark, 3174, -150);
        action_create_object(nidark, 3344, -110);
        action_create_object(nidark, 3544, -190);
        action_create_object(nidark, 3744, -130);
        action_create_object(nidark, 3944, -140);
        action_create_object(nidark, 4144, -120);
        action_create_object(nidark, 4144, 59);
        action_create_object(nidark, 4144, 159);
        action_create_object(nidark, 4104, 259);
        action_create_object(nidark, 4074, 359);
        action_create_object(nidark, 4064, 459);
        action_create_object(nidark, 4034, 559);
        action_create_object(nidark, 4064, 659);
        action_create_object(nidark, 4034, 759);
        action_create_object(nidark, 4024, 859);
        action_create_object(nidark, 4050, 959);
        action_create_object(nidark, 4046, 1059);
        action_create_object(nidark, 4036, 1159);
    }
}
__b__ = action_if_variable(storm, 0, 0);
if (__b__) {
    __b__ = action_if_variable(stormeasy, 0, 0);
    if (__b__) {
        __b__ = action_if_number(736, 0, 2);
        if (__b__) {
            action_create_object(ni, -350, 38);
            action_create_object(ni, -450, 526);
            action_create_object(ni, 470, 982);
            action_create_object(ni, -210, 1132);
        } else {
            action_create_object(nifast, 940, -305);
            action_create_object(nifast, 1735, -298);
            action_create_object(nifast, 2200, 82);
            action_create_object(nifast, 2450, 700);
        }
    }
}
__b__ = action_if_variable(storm, 1, 0);
if (__b__) {
    action_create_object(nidark, -72, -140);
    action_create_object(nidark, 174, -120);
    action_create_object(nidark, 374, -150);
    action_create_object(nidark, 574, -110);
    action_create_object(nidark, 774, -130);
    action_create_object(nidark, 974, -110);
    action_create_object(nidark, 1174, -150);
    action_create_object(nidark, 1344, -110);
    action_create_object(nidark, 1544, -190);
    action_create_object(nidark, 1744, -130);
    action_create_object(nidark, 1944, -140);
    action_create_object(nidark, 2144, -120);
    action_create_object(nidark, 2144, 59);
    action_create_object(nidark, 2144, 159);
    action_create_object(nidark, 2104, 259);
    action_create_object(nidark, 2074, 359);
    action_create_object(nidark, 2064, 459);
    action_create_object(nidark, 2034, 559);
    action_create_object(nidark, 2064, 659);
    action_create_object(nidark, 2034, 759);
    action_create_object(nidark, 2024, 859);
    action_create_object(nidark, 2050, 959);
    action_create_object(nidark, 2046, 1059);
    action_create_object(nidark, 2036, 1159);
}
__b__ = action_if_variable(stormeasy, 1, 0);
if (__b__) {
    __b__ = action_if_dice(4);
    if (__b__) {
        action_create_object(nidark_slow, -381, 38);
    }
    __b__ = action_if_dice(3);
    if (__b__) {
        action_create_object(nidark_slow, -401, 526);
    }
    __b__ = action_if_dice(5);
    if (__b__) {
        action_create_object(nidark_slow, 420, 982);
    }
    __b__ = action_if_dice(2);
    if (__b__) {
        action_create_object(nidark_slow, -232, 1132);
    }
}
