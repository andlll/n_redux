// gml_Object_ccunlom3_Step_0  locals=1 args=0 len=124
// locals: arguments
00000000: push.v obj621.y
00000008: push.imm.e 100
0000000C: push.global.v global.sca
00000014: mul.v.i
00000018: sub.v.v
0000001C: push.v obj621.x
00000024: call action_move_to(argc=2)
0000002C: popz
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.global.v global.sca
00000048: push.d 0.5
00000054: mul.d.v
00000058: push.global.v global.sca
00000060: push.d 0.5
0000006C: mul.d.v
00000070: call action_sprite_transform(argc=4)
00000078: popz