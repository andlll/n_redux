// gml_Object_level2club_Step_0  locals=1 args=0 len=124
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.d 0.5
00000024: mul.d.v
00000028: push.global.v global.sca
00000030: push.d 0.5
0000003C: mul.d.v
00000040: call action_sprite_transform(argc=4)
00000048: popz
0000004C: push.v obj629.y
00000054: push.imm.e 100
00000058: push.global.v global.sca
00000060: mul.v.i
00000064: sub.v.v
00000068: push.v obj629.x
00000070: call action_move_to(argc=2)
00000078: popz