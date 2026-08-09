// gml_Object_recogn_Create_0  locals=2 args=0 len=588
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.d 0.8
00000020: pop.v.d life
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x20B5D9C
00000050: push.imm.e 11
00000054: conv.i.v
00000058: push.imm.e 30
0000005C: conv.i.v
00000060: call action_set_motion(argc=2)
00000068: popz
0000006C: b 0x20B5DB8
00000070: push.imm.e 13
00000074: conv.i.v
00000078: push.imm.e 30
0000007C: conv.i.v
00000080: call action_set_motion(argc=2)
00000088: popz
0000008C: push.imm.e -3990
00000090: pop.v.i depth
00000098: push.imm.e 1
0000009C: pop.v.i desto
000000A4: push.imm.e 455
000000A8: pushenv 0x20B5E14
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 1
000000B8: conv.i.v
000000BC: push.v night
000000C4: call action_if_variable(argc=3)
000000CC: pop.v.v local.__b__
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x20B5E14
000000E4: b 0x20B5E1C
000000E8: popenv 0x40B5DD8
000000EC: b 0x20B5E20
000000F0: popenv 0x1CB5E1C
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x20B5E50
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: push.i 16366009
00000114: conv.i.v
00000118: call action_sprite_color(argc=2)
00000120: popz
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 550
00000130: conv.i.v
00000134: call action_set_alarm(argc=2)
0000013C: popz
00000140: push.imm.e 5
00000144: conv.i.v
00000148: push.imm.e 23
0000014C: conv.i.v
00000150: call action_set_alarm(argc=2)
00000158: popz
0000015C: push.imm.e 2
00000160: conv.i.v
00000164: call action_if_dice(argc=1)
0000016C: pop.v.v local.__b__
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x20B5F64
00000184: push.imm.e 2
00000188: conv.i.v
0000018C: call action_if_dice(argc=1)
00000194: pop.v.v local.__b__
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: bf 0x20B5F20
000001AC: push.imm.e 1
000001B0: conv.i.v
000001B4: call action_set_relative(argc=1)
000001BC: popz
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.imm.e -200
000001CC: conv.i.v
000001D0: call action_move_to(argc=2)
000001D8: popz
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: call action_set_relative(argc=1)
000001EC: popz
000001F0: b 0x20B5F64
000001F4: push.imm.e 1
000001F8: conv.i.v
000001FC: call action_set_relative(argc=1)
00000204: popz
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e -370
00000214: conv.i.v
00000218: call action_move_to(argc=2)
00000220: popz
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: call action_set_relative(argc=1)
00000234: popz
00000238: push.imm.e 0
0000023C: conv.i.v
00000240: call action_set_relative(argc=1)
00000248: popz