// gml_Object_easymo_Step_0  locals=2 args=0 len=144
// locals: arguments, __b__
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
0000004C: push.imm.e 2
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 149
00000060: conv.i.v
00000064: call action_if_number(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x21EAB00
00000084: call action_kill_object(argc=0)
0000008C: popz