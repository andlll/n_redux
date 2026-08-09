// gml_Object_ruinsol_Create_0  locals=2 args=0 len=352
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x2136FD4
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 530
0000003C: conv.i.v
00000040: call action_sprite_set(argc=3)
00000048: popz
0000004C: push.v y
00000054: neg.v.d
00000058: pop.v.v depth
00000060: push.imm.e 455
00000064: pushenv 0x213702C
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 1
00000074: conv.i.v
00000078: push.v night
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x213702C
000000A0: b 0x2137034
000000A4: popenv 0x4136FF0
000000A8: b 0x2137038
000000AC: popenv 0x1D37034
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2137068
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.i 16366009
000000D0: conv.i.v
000000D4: call action_sprite_color(argc=2)
000000DC: popz
000000E0: push.imm.e 455
000000E4: pushenv 0x21370AC
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.v dawn
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x21370AC
00000120: b 0x21370B4
00000124: popenv 0x4137070
00000128: b 0x21370B8
0000012C: popenv 0x1D370B4
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x21370E8
00000140: push.imm.e 1
00000144: conv.i.v
00000148: push.i 15201023
00000150: conv.i.v
00000154: call action_sprite_color(argc=2)
0000015C: popz