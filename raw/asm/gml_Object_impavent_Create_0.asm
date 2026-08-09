// gml_Object_impavent_Create_0  locals=2 args=0 len=376
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2146AA8
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2146AA8
00000040: b 0x2146AB0
00000044: popenv 0x4146A6C
00000048: b 0x2146AB4
0000004C: popenv 0x1D46AB0
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2146AE4
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x2146B28
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2146B28
000000C0: b 0x2146B30
000000C4: popenv 0x4146AEC
000000C8: b 0x2146B34
000000CC: popenv 0x1D46B30
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x2146B64
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.imm.e 1
00000110: add.i.v
00000114: pop.v.v depth
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 336
00000130: conv.i.v
00000134: call action_sprite_set(argc=3)
0000013C: popz
00000140: push.imm.e 0
00000144: conv.i.v
00000148: push.imm.e 1740
0000014C: conv.i.v
00000150: call action_set_alarm(argc=2)
00000158: popz
0000015C: push.imm.e 3
00000160: conv.i.v
00000164: push.imm.e 300
00000168: conv.i.v
0000016C: call action_set_alarm(argc=2)
00000174: popz