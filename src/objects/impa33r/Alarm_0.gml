/// gml_Object_impa33r_Alarm_0
// locals: __b__
__b__ = action_if_variable(demos, 0, 0);
if (__b__) {
    action_set_alarm(24, 0);
    if (phase == 1) {
        sprite_index = 131;
        phase = phase + 1;
        exit;
    }
    if (phase == 2) {
        sprite_index = 129;
        phase = phase + 1;
        exit;
    }
    if (phase == 3) {
        sprite_index = 127;
        phase = phase + 1;
        exit;
    }
    if (phase == 4) {
        sprite_index = 125;
        phase = phase + 1;
        exit;
    }
    if (phase == 5) {
        sprite_index = 123;
        phase = phase + 1;
        exit;
    }
    if (phase == 6) {
        sprite_index = 121;
        phase = phase + 1;
        exit;
    }
    if (phase == 7) {
        sprite_index = 119;
        phase = phase + 1;
        exit;
    }
    if (phase == 8) {
        sprite_index = 117;
        phase = phase + 1;
        exit;
    }
    if (phase == 9) {
        sprite_index = 115;
        phase = phase + 1;
        exit;
    }
    if (phase == 10) {
        sprite_index = 113;
        phase = phase + 1;
        exit;
    }
    if (phase == 11) {
        sprite_index = 111;
        phase = phase + 1;
        exit;
    }
    if (phase == 12) {
        sprite_index = 109;
        phase = phase + 1;
        exit;
    }
    if (phase == 13) {
        sprite_index = 107;
        phase = phase + 1;
        exit;
    }
    if (phase == 14) {
        sprite_index = 105;
        phase = phase + 1;
        exit;
    }
    if (phase == 15) {
        sprite_index = 103;
        phase = phase + 1;
        exit;
    }
    if (phase == 16) {
        sprite_index = 101;
        phase = phase + 1;
        exit;
    }
    if (phase == 17) {
        sprite_index = 99;
        phase = phase + 1;
        exit;
    }
    if (phase == 18) {
        sprite_index = 97;
        phase = phase + 1;
        exit;
    }
    __b__ = action_if_variable(phase, 19, 0);
    if (__b__) {
        action_set_alarm(2400, 1);
        demos = 1;
    }
}
with (r12) {
    __b__ = action_if_variable(ele, -1000, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, -1000, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
    }
}
