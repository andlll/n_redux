// gml_Object_monviolo_Create_0  locals=2 args=0 len=524
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: pop.v.i life
00000020: push.imm.e 5
00000024: conv.i.v
00000028: push.imm.e 34
0000002C: conv.i.v
00000030: call action_set_alarm(argc=2)
00000038: popz
0000003C: push.imm.e 6
00000040: conv.i.v
00000044: push.imm.e 3600
00000048: conv.i.v
0000004C: call action_set_alarm(argc=2)
00000054: popz
00000058: push.imm.e 10
0000005C: conv.i.v
00000060: push.imm.e 6
00000064: conv.i.v
00000068: call random_range(argc=2)
00000070: push.imm.e 30
00000074: conv.i.v
00000078: call action_set_motion(argc=2)
00000080: popz
00000084: push.imm.e -3990
00000088: pop.v.i depth
00000090: push.imm.e 1
00000094: pop.v.i desto
0000009C: push.imm.e 455
000000A0: pushenv 0x20B2EB8
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.v night
000000BC: call action_if_variable(argc=3)
000000C4: pop.v.v local.__b__
000000CC: push.local.v local.__b__
000000D4: conv.v.b
000000D8: bf 0x20B2EB8
000000DC: b 0x20B2EC0
000000E0: popenv 0x40B2E7C
000000E4: b 0x20B2EC4
000000E8: popenv 0x1CB2EC0
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20B2EF4
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.i 16366009
0000010C: conv.i.v
00000110: call action_sprite_color(argc=2)
00000118: popz
0000011C: push.imm.e 2
00000120: conv.i.v
00000124: call action_if_dice(argc=1)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20B2FD0
00000144: push.imm.e 2
00000148: conv.i.v
0000014C: call action_if_dice(argc=1)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x20B2F8C
0000016C: push.imm.e 1
00000170: conv.i.v
00000174: call action_set_relative(argc=1)
0000017C: popz
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.imm.e -200
0000018C: conv.i.v
00000190: call action_move_to(argc=2)
00000198: popz
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz
000001B0: b 0x20B2FD0
000001B4: push.imm.e 1
000001B8: conv.i.v
000001BC: call action_set_relative(argc=1)
000001C4: popz
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: push.imm.e -370
000001D4: conv.i.v
000001D8: call action_move_to(argc=2)
000001E0: popz
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: call action_set_relative(argc=1)
000001F4: popz
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: call action_set_relative(argc=1)
00000208: popz