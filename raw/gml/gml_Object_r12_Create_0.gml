/// gml_Object_r12_Create_0
// locals: __b__
action_set_relative(0);
instance_create(0, 0, qq1);
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    with (albe2) {
        action_kill_object();
    }
    with (albe3) {
        action_kill_object();
    }
    with (albe) {
        action_kill_object();
    }
}
noemi = 0;
global.sca = 1;
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(r120, 1170, 346);
    action_set_relative(0);
    with (r120) {
        instance_create(x + 282, y + 794, albe);
        instance_create(x + 439, y + 783, albe);
        instance_create(x + 379, y + 748, albe);
        instance_create(x + 518, y + 750, albe);
        instance_create(x + 565, y + 700, albe);
        instance_create(x + 463, y + 695, albe);
        instance_create(x + 538, y + 646, albe);
        instance_create(x + 637, y + 609, albe);
        instance_create(x + 699, y + 556, albe);
        instance_create(x + 758, y + 524, albe);
        instance_create(x + 816, y + 559, albe);
        instance_create(x + 724, y + 617, albe);
        instance_create(x + 672, y + 659, albe);
        instance_create(x + 739, y + 651, albe);
    }
    action_create_object(moto11, 1951, 858);
    action_create_object(moto11, 1632, 1037);
    action_create_object(faro1, 616, 1100);
    action_create_object(faro2, 1655, 1111);
    action_create_object(moto11, 656, 1231);
    action_create_object(moto12, 198, 217);
    action_create_object(moto12, 514, 34);
    action_create_object(moto13, 44, 876);
    action_create_object(moto13, 1015, 1142);
    action_create_object(mudr2, 769, 845);
}
action_create_object(hyposet, 0, 0);
exiting = 0;
action_set_alarm(60, 10);
action_set_alarm(36000, 11);
randomize();
hap = 400;
autocore = 0;
allerta = 0;
selec = 0;
biotech = 0;
oil = 7500;
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    oil = 5000;
    action_set_relative(1);
    hap = hap + 200;
    action_set_relative(0);
}
action_create_object(basedis, 0, 0);
action_create_object(carmaker, 0, 0);
wewe = 100;
__b__ = action_if_number(617, 1, 0);
if (__b__) {
    ele = 200;
} else {
    ele = 1e+21;
}
crys = 0;
mon = 5500;
spy = 0;
action_set_alarm(29000, 8);
storm = 0;
stormeasy = 0;
pop = 0;
time = 2914;
randomize();
action_set_alarm(40, 0);
action_set_alarm(60, 2);
action_set_alarm(300, 1);
action_set_alarm(3600, 3);
onda = 0;
ondan = 0;
dara = 0;
bombus = 0;
bombolo = 0;
bombn = 0;
dirox = 0;
diro = 0;
diron = 0;
arma = 0;
__b__ = action_if_number(8, 0, 0);
if (__b__) {
    __b__ = action_if_variable(exiting, 0, 0);
    if (__b__) {
        action_create_object(salvador, 0, 0);
    }
}
action_set_relative(0);
