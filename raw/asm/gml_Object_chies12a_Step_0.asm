// gml_Object_chies12a_Step_0  locals=2 args=0 len=192
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
0000004C: push.imm.e 154
00000050: pushenv 0x21E9938
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 1
00000060: conv.i.v
00000064: push.v level
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: not.b.d
0000008C: bf 0x21E9938
00000090: b 0x21E9940
00000094: popenv 0x41E98F8
00000098: b 0x21E9944
0000009C: popenv 0x1DE9940
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: not.b.d
000000B0: bf 0x21E9964
000000B4: call action_kill_object(argc=0)
000000BC: popz