// gml_Object_wavesig1_Step_0  locals=2 args=0 len=316
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 455
00000030: pushenv 0x20B6F0C
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 1
00000040: conv.i.v
00000044: push.v night
0000004C: call action_if_variable(argc=3)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: not.b.d
0000006C: bf 0x20B6F0C
00000070: b 0x20B6F14
00000074: popenv 0x40B6ECC
00000078: b 0x20B6F18
0000007C: popenv 0x1CB6F14
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: not.b.d
00000090: bf 0x20B6F54
00000094: push.d 0.3
000000A0: conv.d.v
000000A4: push.i 16777215
000000AC: conv.i.v
000000B0: call action_sprite_color(argc=2)
000000B8: popz
000000BC: push.imm.e 455
000000C0: pushenv 0x20B6F98
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.v night
000000DC: call action_if_variable(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20B6F98
000000FC: b 0x20B6FA0
00000100: popenv 0x40B6F5C
00000104: b 0x20B6FA4
00000108: popenv 0x1CB6FA0
0000010C: push.local.v local.__b__
00000114: conv.v.b
00000118: bf 0x20B6FD4
0000011C: push.imm.e 1
00000120: conv.i.v
00000124: push.i 16777215
0000012C: conv.i.v
00000130: call action_sprite_color(argc=2)
00000138: popz